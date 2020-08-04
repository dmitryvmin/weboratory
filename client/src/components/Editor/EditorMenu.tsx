// Libs
import React, { useContext } from "react";
import MdUndo from "react-ionicons/lib/MdUndo";
import MdRedo from "react-ionicons/lib/MdRedo";

// Styles
import classNames from "@components/Editor/styles.module.scss";

// Components
import { Button } from "@components/UI/Button";
import { convertSelectionTo } from "@components/Editor/utils/convertSelectionTo";
import { insertCodeBlock } from "@components/Editor/utils/insertCodeBlock";
import { useEditor } from "@stores/EditorStore";

/**
 * Render
 */
const EditorMenu = () => {

  const {
    contentHistory,
    activeRecordIdx,
    setRecordIdx,
  } = useEditor();

  return (
    <div className={classNames.editorMenu}>
      <Button
        color="secondary"
        disabled={contentHistory.length < 2}
        onClick={setRecordIdx(-1)}
      >
        <MdUndo/>
      </Button>
      <Button
        color="secondary"
        disabled={activeRecordIdx > -1}
        onClick={setRecordIdx(1)}
      >
        <MdRedo/>
      </Button>
      {/*<Button onClick={toggleEditMenu}>*/}
      {/*  Edit Menu {isEditMenuVisible ? "on" : "off"}*/}
      {/*</Button>*/}
      <Button
        color="secondary"
        onClick={() => convertSelectionTo("H1")}
      >
        H1
      </Button>
      <Button
        color="secondary"
        onClick={() => insertCodeBlock}
      >
        Code
      </Button>
    </div>
  );
};

export { EditorMenu };