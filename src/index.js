import React from 'react'
import lucidfish from './translation'

import Editor from './editor'
import Reader from './reader'
import Topics from './topics'

export default class EasyForum extends React.PureComponent {
  openEditor () {
    this.setState({
      writerVisible: true,
      readerVisible: false,
      modifierVisible: false,
    })
  }

  cancelWriting () {
    this.setState({
      writerVisible: false,
    })
  }

  writeTopic (title, contents) {
    const {
      onWriteTopic,
    } = this.props

    this.setState({
      writerVisible: false,
    })

    if (onWriteTopic) {
      onWriteTopic(title, contents)
    }
  }

  deleteTopic () {
    const {
      selectedTopic,
      onDeleteTopic,
    } = this.props

    if (onDeleteTopic) {
      onDeleteTopic(selectedTopic.idx)
    }
    this.closeReader()
  }

  modifyTopic (title, contents) {
    const {
      selectedTopic,
      onModifyTopic,
    } = this.props

    this.setState({
      writerVisible: false,
      readerVisible: true,
      modifierVisible: false,
    })

    if (onModifyTopic) {
      onModifyTopic(selectedTopic.idx, title, contents)
    }
  }

  writeComment (topic_idx, contents) {
    const {
      onWriteComment,
    } = this.props

    if (onWriteComment) {
      onWriteComment(topic_idx, contents)
    }
  }

  deleteComment (topic_idx, comment_idx) {
    const {
      onDeleteComment,
    } = this.props

    if (onDeleteComment) {
      onDeleteComment(topic_idx, comment_idx)
    }
  }

  modifyComment (comment_idx, contents) {
    const {
      onModifyComment,
    } = this.props

    if (onModifyComment) {
      onModifyComment(comment_idx, contents)
    }
  }

  readTopic (idx) {
    const {
      onReadTopic,
    } = this.props

    this.setState({
      writerVisible: false,
      readerVisible: true,
      modifierVisible: false,
    })
    if (onReadTopic) {
      onReadTopic(idx)
    }
  }

  openModifier () {
    this.setState({
      writerVisible: false,
      readerVisible: false,
      modifierVisible: true,
    })
  }

  closeReader () {
    this.setState({
      readerVisible: false,
    })
  }

  cancelModifying () {
    this.setState({
      modifierVisible: false,
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
      selectedTopic: {
        title: '', contents: '', comments: [],
      },
    }
  }

  constructor () {
    super()
    this.state = {
      writerVisible: false,
      readerVisible: false,
      modifierVisible: false,
    }
  }

  render () {
    const { selectedTopic } = this.props
    const { readerVisible, writerVisible, modifierVisible } = this.state
    return (
      <div className="row justify-content-md-center">
        <div className="col col-sm-12">
          {writerVisible && <Editor
            onCancel={this.cancelWriting.bind(this)}
            onWrite={this.writeTopic.bind(this)} />}
          {modifierVisible && <Editor
            title={selectedTopic.title}
            contents={selectedTopic.contents}
            onCancel={this.cancelModifying.bind(this)}
            onWrite={this.modifyTopic.bind(this)} />}
          {readerVisible && <Reader
            idx={selectedTopic.idx}
            title={selectedTopic.title}
            contents={selectedTopic.contents}
            comments={selectedTopic.comments}
            onModifyTopic={this.openModifier.bind(this)}
            onCloseTopic={this.closeReader.bind(this)}
            onWriteTopic={this.writeTopic.bind(this)}
            onDeleteTopic={this.deleteTopic.bind(this)}
            onWriteComment={this.writeComment.bind(this)}
            onDeleteComment={this.deleteComment.bind(this)}
            onModifyComment={this.modifyComment.bind(this)} />}
          <div className="text-right">
            {!writerVisible && !modifierVisible && this.renderWritingButton()}
          </div>
          <Topics {...this.props} onRead={this.readTopic.bind(this)} />
          <div className="text-right">
            {!writerVisible && !modifierVisible && this.renderWritingButton()}
          </div>
        </div>
      </div>
    )
  }
}
