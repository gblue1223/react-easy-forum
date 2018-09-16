import React from 'react'
import lucidfish from './translation'

import Editor from './editor'
import Reader from './reader'
import Topics from './topics'

export default class EasyForum extends React.PureComponent {
  openEditor () {
    this.setState({
      readerVisible: false,
      editorVisible: true,
    })
  }

  writeTopic (title, contents) {
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

  writeComment (topic_idx, contents) {
    const {
      onComment,
    } = this.props

    if (onComment) {
      onComment(topic_idx, contents)
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
      readerVisible: false,
    })
  }

  renderWritingButton () {
    const { writingIcon } = this.props.theme
    return (
      <button className="btn btn-primary m-1" onClick={this.openEditor.bind(this)}>
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
      topics: [],
      readTopic: {
        title: '', contents: '', comments: [],
      },
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
            onWrite={this.writeTopic.bind(this)} />}
          {readerVisible && !editorVisible && <Reader
            idx={readTopic.idx}
            title={readTopic.title}
            contents={readTopic.contents}
            comments={readTopic.comments}
            onComment={this.writeComment.bind(this)}
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
