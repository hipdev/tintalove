//import { Editor } from "react-draft-wysiwyg";
import { useForm, Controller } from "react-hook-form";
import dynamic from "next/dynamic";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Editor = dynamic(
  () => {
    return import('react-draft-wysiwyg').then((mod) => mod.Editor);
  },
  { loading: () => null, ssr: false },
);

const EditorText = () => {

  const handleEditorChange = e => {
    console.log(e);
  }

  const { handleSubmit, control, watch } = useForm({
    mode: "onChange"
  });

  const handleSubmitOnClick = ({ editor_content }) => {
    console.log("editor_content ==> ", editor_content);
  };

  console.log(watch("editor_content"));
  
  return (
    <div className="bg-white h-80 rounded-lg overflow-hidden">
      <form onSubmit={handleSubmit(handleSubmitOnClick)} name="document">
      <Controller
        name="editor_content"
        control={control}
        defaultValue=""
        render={props => (
          <Editor
            onChange={handleEditorChange}
            {...props}
            onEditorStateChange={editorState => {
              if (editorState.blocks) {
                props.onChange(editorState.blocks[0]);
              }
            }}
            placeholder="The message goes here..."
          />
        )}
      />
    </form>
    </div>
  );
};

export default EditorText;
