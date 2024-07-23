import { Flex, Spin } from 'antd';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Contact } from '../../components/Contact/Contact';
import { selectIsContacts, selectIsFetching } from './homeSlice';
import { fetchContacts } from './homeThunks';

export const Home = () => {
  const dispatch = useAppDispatch();
  const contacts = useAppSelector(selectIsContacts);
  const isFetching = useAppSelector(selectIsFetching);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  if (isFetching) {
    return <Spin className={'a-centered'} />;
  }

  return (
    <Flex gap={'middle'} vertical>
      {contacts.map((contact) => (
        <Contact key={contact.id} contact={contact} />
      ))}
    </Flex>
  );
};
