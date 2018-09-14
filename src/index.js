import React from 'react'
import lucidfish from './translation'

import Editor from './editor'
import Reader from './reader'
import Topics from './topics'

export default class EasyForum extends React.PureComponent {
  toggleEditor () {
    this.setState({
      editorVisible: !this.state.editorVisible,
    })
  }

  closeEditor (title, contents) {
    const {
      onWrite,
    } = this.props

    this.setState({
      editorVisible: false,
    })
    if (onWrite) {
      onWrite(title, contents)
    }
  }

  cancelWriting () {
    const {
      onCancel,
    } = this.props

    this.setState({
      editorVisible: false,
    })
    if (onCancel) {
      onCancel()
    }
  }

  read (idx) {
    const {
      onRead,
    } = this.props

    this.setState({
      readerVisible: true,
      editorVisible: false,
    })
    if (onRead) {
      onRead(idx)
    }
  }

  closeReader () {
    this.setState({
      readerVisible: !this.state.readerVisible,
    })
  }

  renderWritingButton () {
    const { writingIcon } = this.props.theme
    return (
      <button className="btn btn-primary m-1" onClick={this.toggleEditor.bind(this)}>
        {writingIcon}
        {lucidfish.forum.write}
      </button>
    )
  }

  static get defaultProps () {
    return {
      theme: {
        writingIcon: <em className="fa fa-edit fa-fw" />,
      },
      data: [],
    }
  }

  constructor () {
    super()
    this.state = {
      editorVisible: false,
    }
  }

  render () {
    const { readTopic } = this.props
    const { readerVisible, editorVisible } = this.state
    return (
      <div className="row justify-content-md-center">
        <div className="col col-sm-12">
          {editorVisible && !readerVisible && <Editor
            onCancel={this.cancelWriting.bind(this)}
            onWritten={this.closeEditor.bind(this)} />}
          {readerVisible && !editorVisible && <Reader
            title={readTopic.title}
            contents={readTopic.contents}
            onClose={this.closeReader.bind(this)} />}
          <div className="text-right">
            {!editorVisible && this.renderWritingButton()}
          </div>
          <Topics {...this.props} onRead={this.read.bind(this)} />
          <div className="text-right">
            {!editorVisible && this.renderWritingButton()}
          </div>
        </div>
      </div>
    )
  }
}
