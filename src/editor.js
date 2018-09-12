import React from 'react'
import lucidfish from './translation'

// React Draft Wysiwyg
import { EditorState, ContentState, convertToRaw, convertFromHTML } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftToHtml from 'draftjs-to-html'

export default class EditorView extends React.PureComponent {
  onEditorStateChange (editorState) {
    this.setState({ editorState })
    this.contents = draftToHtml(convertToRaw(editorState.getCurrentContent()))
  }

  constructor () {
    super()
    this.state = {
      editorState: EditorState.createEmpty()
    }
  }

  render () {
    const {
      onCancel,
      onWrite,
    } = this.props

    const handleSubmit = () => {
      if (onWrite) {
        onWrite(this.titleRef.value, this.contents)
      }
    }
    return (
      <div>
        <div className="row justify-content-md-center">
          <div className="col col-sm-12">
            <form onSubmit={handleSubmit}>
              <input
                ref={r => { this.titleRef = r }}
                type="text"
                name="title"
                placeholder="Article title..."
                className="mb-3 form-control form-control-lg"
              />
              <Editor
                editorState={this.state.editorState}
                wrapperClassName="wysiwig-editor-wrapper"
                editorClassName="form-control"
                editorStyle={{ height: 300 }}
                onEditorStateChange={this.onEditorStateChange.bind(this)}
              />
              <br/>
              <div className="clearfix">
                <div className="pull-left">
                </div>
                <div className="pull-right">
                  <button type="button" className="btn btn-secondary" onClick={onCancel}>
                    <em className="fa fa-close fa-fw" />
                    {lucidfish.common.cancel}
                  </button>
                  <button type="submit" className="btn btn-primary m-t-10">
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
