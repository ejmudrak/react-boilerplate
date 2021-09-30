import { useState, useEffect } from 'react';

// components
import {
  IconButton,
  CircularProgress,
  ListItem as MuiListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';

import { Delete } from '@mui/icons-material';

// api
import { useDeleteUserMutation } from 'api/users';

export default function ListItem({ item }: { item: any }) {
  // RQ initializations
  const { mutate: deleteUser, isLoading: isDeleting } = useDeleteUserMutation();

  // Handles loading state for
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Reset the loading state
    if (!isDeleting && isLoading) {
      setIsLoading(false);
    }
  }, [isDeleting, isLoading]);

  const handleDeleteItem = (idToDelete: number) => {
    setIsLoading(true);
    deleteUser(idToDelete);
  };

  return (
    <MuiListItem sx={{ textAlign: 'center' }}>
      <ListItemText>
        {item.first_name} {item.last_name}
      </ListItemText>

      <ListItemSecondaryAction onClick={() => handleDeleteItem(item.id)}>
        {isDeleting ? (
          <CircularProgress size={24} />
        ) : (
          <IconButton color='error'>
            <Delete />
          </IconButton>
        )}
      </ListItemSecondaryAction>
    </MuiListItem>
  );
}
