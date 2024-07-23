import { Flex, Spin, Typography } from 'antd';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Contact } from '../../components/Contact/Contact';
import { selectIsContacts, selectIsFetching } from './homeSlice';
import { fetchContacts } from './homeThunks';
import { motion } from 'framer-motion';

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
      {contacts.length === 0 ? (
        <Typography.Text className={'a-centered'}>Contact list is empty...</Typography.Text>
      ) : (
        contacts.map((contact, index) => (
          <motion.div
            key={contact.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Contact key={contact.id} contact={contact} />
          </motion.div>
        ))
      )}
    </Flex>
  );
};
