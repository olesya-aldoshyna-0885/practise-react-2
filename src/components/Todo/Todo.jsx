import { Text } from 'components';
import { TodoWrapper, DeleteButton, EditButton } from './Todo.styled';
import { RiDeleteBinLine, RiEdit2Line } from 'react-icons/ri';

export const Todo = ({ id, text, index, onDelete, onEdit }) => {
  return (
    <TodoWrapper>
      <Text textAlign="center" marginBottom="20px">
        TODO #{index}
      </Text>
      <Text>{text}</Text>
      <DeleteButton type="button" onClick={() => onDelete(id)}>
        <RiDeleteBinLine size={24} />
      </DeleteButton>
      <EditButton type="button" onClick={() => onEdit()}>
        <RiEdit2Line size={24} />
      </EditButton>
    </TodoWrapper>
  );
};
