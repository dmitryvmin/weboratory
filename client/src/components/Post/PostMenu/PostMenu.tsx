// Libs
import React, { FC, useRef } from "react";

// API
import { editorService, postServiceSingleton } from "@api/services";

// Hooks
import { useObservable } from "@utils/hooks/useObservable";

// Components
import { Button } from "@components/UI/Button";
import { TagsMenu } from "@components/Tags/TagsMenu";

// Styles
import styles from "./styles.module.scss";

// Types
import { PostMenuProps } from "@components/Post/PostMenu/types";
import { EditorMenu } from "@components/Editor/EditorMenu";

const PostMenu: FC<PostMenuProps> = ({
  post,
  title,
  tagMapSingleton,
  editorSingleton,
  handleSave,
  handleDelete,
}) => {

  // const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  // const [editState, setEditState] = useState<boolean>(false);

  const editorContent$ = useObservable(editorSingleton.onEditorContent());

  // useEffect(() => {
  //   // subscribe to Post state
  //   const subscription = postServiceSingleton.onPostState().subscribe((state) => {
  //     setEditState(state.editState);
  //   });
  //
  //   // return unsubscribe method to execute when component unmounts
  //   return () => subscription.unsubscribe();
  // }, []);

  // function handleEdit() {
  //   postServiceSingleton.setEditState({ editState: true });
  // }

  // function cancelSave() {
  //   postServiceSingleton.setEditState({ editState: false });
  // }

  return (
    <div className={styles.container}>
      <Button onClick={() => handleSave()}>
        Save
      </Button>
      {handleDelete &&
      <Button onClick={() => handleDelete()} confirm>
        Delete Post
      </Button>}
      <TagsMenu
        post={post}
        tagMapSingleton={tagMapSingleton}
      />
      <EditorMenu/>
    </div>
  );
};

export { PostMenu };
