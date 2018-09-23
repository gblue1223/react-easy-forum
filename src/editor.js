import React from 'react'
import lucidfish from './translation'

// React Draft Wysiwyg
import { Editor, EditorState, convertToRaw } from 'draft-js'
import { Editor as Wysiwyg } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftToHtml from 'draftjs-to-html'

export default class EditorView extends React.PureComponent {
  changeState (editorState) {
    this.setState({ editorState })
    this.contents = draftToHtml(convertToRaw(editorState.getCurrentContent()))
  }

  constructor (props) {
    super(props)
    this.state = {
      title: props.title || '',
      contents: props.contents || '',
      editorState: EditorState.createEmpty()
    }
  }

  render () {
    const {
      onCancel,
      onWrite,
    } = this.props

    const {
      title,
      contents,
    } = this.state

    const handleSubmit = e => {
      e.preventDefault()
      if (onWrite) {
        onWrite(title, contents)
      }
    }

    const handleInputChange = e => {
      const target = e.target
      const value = target.type === 'checkbox' ? target.checked : target.value
      const name = target.name
      this.setState({ [name]: value })
    }
    return (
      <div>
        <div className="row justify-content-md-center">
          <div className="col col-sm-12">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                className="mb-3 form-control form-control-lg"
                placeholder={lucidfish.forum.titlePlaceholder}
                value={title}
                onChange={handleInputChange}
              />
              <textarea
                name="contents"
                className="form-control"
                style={{ height: 300 }}
                placeholder={lucidfish.forum.contentsPlaceholder}
                value={contents}
                onChange={handleInputChange}
              />
              {/*<Editor*/}
                {/*editorState={this.state.editorState}*/}
                {/*onChange={this.changeState.bind(this)}*/}
              {/*/>*/}
              {/*<Wysiwyg*/}
                {/*editorState={this.state.editorState}*/}
                {/*wrapperClassName="wysiwig-editor-wrapper"*/}
                {/*editorClassName="form-control"*/}
                {/*editorStyle={{ height: 300 }}*/}
                {/*onEditorStateChange={this.changeState.bind(this)}*/}
              {/*/>*/}
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
