// Libs
import React, { useContext } from "react";

// Styles
import classNames from "@components/Editor/styles.module.scss";

// Components
import { Button } from "@components/UI/Button";
import { convertSelectionTo } from "@components/Editor/utils/convertSelectionTo";
import { insertCodeBlock } from "@components/Editor/utils/insertCodeBlock";
import { ChevronLeft, ChevronRight } from "@components/UI/Icon";
import { useEditor } from "@components/Editor/EditorStore";

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
        <ChevronLeft/>
      </Button>
      <Button
        color="secondary"
        disabled={activeRecordIdx > -1}
        onClick={setRecordIdx(1)}
      >
        <ChevronRight/>
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
