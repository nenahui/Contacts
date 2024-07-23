import React, { useState } from 'react';
import { Button, Empty, Flex, Form, Image, Input } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import type { IContact } from '../../types';
import { selectIsCreating } from './contactFormSlice';
import { createContact, editContact } from './contactFormThunks';

export const ContactForm = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const isCreating = useAppSelector(selectIsCreating);
  const navigate = useNavigate();
  const [form] = Form.useForm<IContact>();
  const [imagePreview, setImagePreview] = useState('');

  const onFinish = async (contact: IContact) => {
    if (id) {
      await dispatch(editContact({ ...contact, id }));
      navigate('/');
      return;
    }

    await dispatch(createContact(contact));
    navigate('/');
  };

  const imageChange = (url: string) => {
    setImagePreview((prevState) => (prevState += url));
  };

  const onCancel = () => navigate('/');

  return (
    <Form layout={'vertical'} onFinish={onFinish} form={form}>
      <Flex gap={'middle'} vertical>
        <Form.Item<IContact>
          className={'m-0'}
          label={'Name'}
          name={'name'}
          rules={[{ required: true, message: 'This is a required field…' }]}
        >
          <Input placeholder={'Enter name…'} autoComplete={'off'} />
        </Form.Item>

        <Form.Item<IContact>
          className={'m-0'}
          label={'Phone'}
          name={'phone'}
          rules={[{ required: true, message: 'This is a required field…' }]}
        >
          <Input placeholder={'Enter phone…'} autoComplete={'off'} />
        </Form.Item>

        <Form.Item<IContact>
          className={'m-0'}
          label={'E-Mail'}
          name={'email'}
          rules={[{ required: true, message: 'This is a required field…', type: 'email' }]}
        >
          <Input placeholder={'Enter email…'} autoComplete={'off'} />
        </Form.Item>

        <Form.Item<IContact>
          className={'m-0'}
          label={'Image'}
          name={'image'}
          rules={[{ required: true, message: 'This is a required field…' }]}
        >
          <Input
            placeholder={'Enter image url…'}
            autoComplete={'off'}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => imageChange(e.target.value)}
          />
        </Form.Item>

        <Form.Item label={'Image preview'} className={'m-0'}>
          {imagePreview.length === 0 ? (
            <Empty description={'No image'} />
          ) : (
            <Image src={imagePreview} width={200} alt={'Contact image incorrect'} />
          )}
        </Form.Item>

        <Button type={'primary'} htmlType={'submit'} loading={isCreating}>
          Save
        </Button>
        <Button onClick={onCancel} danger>
          Cancel
        </Button>
      </Flex>
    </Form>
  );
};
