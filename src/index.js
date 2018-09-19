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

  writeTopic (title, contents) {
    const {
      onWrite,
    } = this.props

    this.setState({
      writerVisible: false,
    })

    if (onWrite) {
      onWrite(title, contents)
    }
  }

  cancelWriting () {
    this.setState({
      writerVisible: false,
    })
  }

  writeComment (topic_idx, contents) {
    const {
      onComment,
    } = this.props

    if (onComment) {
      onComment(topic_idx, contents)
    }
  }

  readTopic (idx) {
    const {
      onRead,
    } = this.props

    this.setState({
      writerVisible: false,
      readerVisible: true,
      modifierVisible: false,
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

  deleteTopic () {
    const {
      readTopic,
      onDelete,
    } = this.props

    if (onDelete) {
      onDelete(readTopic.idx)
    }
  }

  openModifier () {
    this.setState({
      writerVisible: false,
      readerVisible: false,
      modifierVisible: true,
    })
  }

  modifyTopic (title, contents) {
    const {
      readTopic,
      onModify,
    } = this.props

    this.setState({
      writerVisible: false,
      readerVisible: true,
      modifierVisible: false,
    })

    if (onModify) {
      onModify(readTopic.idx, title, contents)
    }
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
      readTopic: {
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
    const { readTopic } = this.props
    const { readerVisible, writerVisible, modifierVisible } = this.state
    return (
      <div className="row justify-content-md-center">
        <div className="col col-sm-12">
          {writerVisible && <Editor
            onCancel={this.cancelWriting.bind(this)}
            onWrite={this.writeTopic.bind(this)} />}
          {modifierVisible && <Editor
            title={readTopic.title}
            contents={readTopic.contents}
            onCancel={this.cancelModifying.bind(this)}
            onWrite={this.modifyTopic.bind(this)} />}
          {readerVisible && <Reader
            idx={readTopic.idx}
            title={readTopic.title}
            contents={readTopic.contents}
            comments={readTopic.comments}
            onComment={this.writeComment.bind(this)}
            onClose={this.closeReader.bind(this)}
            onDelete={this.deleteTopic.bind(this)}
            onModify={this.openModifier.bind(this)} />}
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
