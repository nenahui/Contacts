import { Button, Empty, Flex, Form, Image, Input } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import type { IContact } from '../../types';
import { fetchContactInfo } from '../Home/homeThunks';
import {
  selectContactInfo,
  selectIsCreating,
  selectIsEditing,
  selectIsLoading,
} from './contactFormSlice';
import { createContact, editContact } from './contactFormThunks';
import { motion } from 'framer-motion';

export const ContactForm = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const isCreating = useAppSelector(selectIsCreating);
  const isLoading = useAppSelector(selectIsLoading);
  const isEditing = useAppSelector(selectIsEditing);
  const contactInfo = useAppSelector(selectContactInfo);
  const navigate = useNavigate();
  const [form] = Form.useForm<IContact>();
  const [imagePreview, setImagePreview] = useState('');

  const getInfo = useCallback(async () => {
    if (id) {
      await dispatch(fetchContactInfo(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    void getInfo();
  }, [getInfo]);

  useEffect(() => {
    if (contactInfo) {
      form.setFieldsValue(contactInfo);
      setImagePreview(contactInfo.image);
    }
  }, [contactInfo, form]);

  useEffect(() => {
    if (!id) {
      form.resetFields();
      setImagePreview('');
    }
  }, [id, form]);

  const onFinish = async (contact: IContact) => {
    if (id) {
      await dispatch(editContact({ ...contact, id }));
      navigate('/');
      return;
    }

    await dispatch(createContact(contact));
    navigate('/');
  };

  const onCancel = () => {
    navigate('/');
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <Form layout={'vertical'} onFinish={onFinish} form={form}>
        <Flex gap={'middle'} vertical>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={'mb-10'}
          >
            <Form.Item<IContact>
              className={'m-0'}
              label={'Name'}
              name={'name'}
              rules={[{ required: true, message: 'This is a required field…' }]}
            >
              <Input
                placeholder={'Enter name…'}
                autoComplete={'off'}
                disabled={isLoading || isEditing}
              />
            </Form.Item>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className={'mb-10'}
          >
            <Form.Item<IContact>
              className={'m-0'}
              label={'Phone'}
              name={'phone'}
              rules={[{ required: true, message: 'This is a required field…' }]}
            >
              <Input placeholder={'Enter phone…'} autoComplete={'off'} />
            </Form.Item>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className={'mb-10'}
          >
            <Form.Item<IContact>
              className={'m-0'}
              label={'E-Mail'}
              name={'email'}
              rules={[{ required: true, message: 'This is a required field…', type: 'email' }]}
            >
              <Input
                placeholder={'Enter email…'}
                autoComplete={'off'}
                disabled={isLoading || isEditing}
              />
            </Form.Item>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className={'mb-10'}
          >
            <Form.Item<IContact>
              className={'m-0'}
              label={'Image'}
              name={'image'}
              rules={[{ required: true, message: 'This is a required field…' }]}
            >
              <Input
                placeholder={'Enter image url…'}
                autoComplete={'off'}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setImagePreview(e.target.value)
                }
                disabled={isLoading || isEditing}
              />
            </Form.Item>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className={'mb-10'}
          >
            <Form.Item label={'Image preview'} className={'m-0'}>
              {imagePreview.length === 0 ? (
                <Empty description={'No image'} />
              ) : (
                <Image src={imagePreview} width={200} alt={'Contact image incorrect'} />
              )}
            </Form.Item>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className={'mb-10'}
          >
            <Flex gap={'middle'} vertical>
              <Button
                type={'primary'}
                htmlType={'submit'}
                loading={isCreating || isLoading || isEditing}
              >
                Save
              </Button>
              <Button onClick={onCancel} danger>
                Cancel
              </Button>
            </Flex>
          </motion.div>
        </Flex>
      </Form>
    </motion.div>
  );
};
