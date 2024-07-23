import React, { Suspense, useState } from 'react';
import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  MailOutlined,
  PhoneOutlined,
} from '@ant-design/icons';
import { Button, Card, Flex, Image, Modal, Spin, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectContactDeleting,
  selectIsContactFetching,
  selectIsContactInfo,
} from '../../feautres/Home/homeSlice';
import { deleteContact, fetchContactInfo, fetchContacts } from '../../feautres/Home/homeThunks';
import type { IApiContact } from '../../types';

interface Props {
  contact: IApiContact;
}

const { Text } = Typography;

export const Contact: React.FC<Props> = ({ contact }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const contactInfo = useAppSelector(selectIsContactInfo);
  const isContactFetching = useAppSelector(selectIsContactFetching);
  const contactDeleting = useAppSelector(selectContactDeleting);

  const showModal = async () => {
    setOpen(true);
    await dispatch(fetchContactInfo(contact.id));
  };

  const onDelete = async () => {
    await dispatch(deleteContact(contact.id));
    dispatch(fetchContacts());
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Card size={'small'}>
      <Flex justify={'space-between'} align={'center'}>
        <div>
          <Text className={'d-block'}>{contact.name}</Text>
          <Text type={'secondary'}>{contact.phone}</Text>
        </div>

        <Button type={'text'} size={'large'} onClick={showModal} icon={<EllipsisOutlined />} />
        <Modal
          footer={[
            <Flex justify={'end'} gap={'middle'} key={'modal-footer'}>
              <Link to={`contact/${contact.id}/edit`}>
                <Button type={'primary'} icon={<EditOutlined />}>
                  Edit
                </Button>
              </Link>

              <Button
                type={'primary'}
                icon={<DeleteOutlined />}
                onClick={onDelete}
                loading={contactDeleting}
                danger
              >
                Delete
              </Button>
            </Flex>,
          ]}
          title={contactInfo?.name}
          open={open}
          loading={isContactFetching}
          onCancel={handleCancel}
          style={{ maxWidth: 350 }}
        >
          <Flex gap={'middle'} vertical>
            <Flex gap={'small'}>
              <PhoneOutlined />
              {contactInfo?.phone}
            </Flex>

            <Flex gap={'small'}>
              <MailOutlined />
              {contactInfo?.email}
            </Flex>

            <Suspense fallback={<Spin />}>
              <Image src={contactInfo?.image} />
            </Suspense>
          </Flex>
        </Modal>
      </Flex>
    </Card>
  );
};
