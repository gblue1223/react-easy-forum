const React = require('react')

// React Draft Wysiwyg
import { EditorState, ContentState, convertFromHTML } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

// Editor's initial content
const blocksFromHTML = convertFromHTML('<p>Write something...</p>')
const initialEditorContent = ContentState.createFromBlockArray(
  blocksFromHTML.contentBlocks,
  blocksFromHTML.entityMap
)

const lucidfish = require('./src/translation')

export default class Editor extends React.PureComponent {
  state = {
    editorState: EditorState.createWithContent(initialEditorContent)
  }

  onEditorStateChange = editorState => {
    this.setState({ editorState })
  }

  render () {
    return (
      <div>
        <div className="row justify-content-md-center">
          <div className="col col-sm-12">
            <form action="">
              <input
                type="text"
                name="article-title"
                placeholder="Article title..."
                className="mb-3 form-control form-control-lg"
              />
              <Editor
                editorState={this.state.editorState}
                wrapperClassName="wysiwig-editor-wrapper"
                editorClassName="form-control"
                editorStyle={{ height: 300 }}
                onEditorStateChange={this.onEditorStateChange}
              />
              <br/>
              <div className="clearfix">
                <div className="pull-left">
                  <button type="button" className="btn btn-danger">
                    <em className="fa fa-trash fa-fw" />
                    {lucidfish.common.delete}
                  </button>
                </div>
                <div className="pull-right">
                  <button type="button" className="btn btn-primary m-t-10">
                    <em className="fa fa-check fa-fw" />
                    {lucidfish.common.save}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
