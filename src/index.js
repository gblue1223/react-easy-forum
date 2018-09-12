import React from 'react'
import lucidfish from './translation'

import Editor from './editor'
import Topics from './topics'

export default class EasyForum extends React.PureComponent {
  cancelWriting () {
    const {
      onCancel,
    } = this.props

    this.setState({
      editorVisibility: false,
    })
    if (onCancel) {
      onCancel()
    }
  }

  handleWriting (title, contents) {
    const {
      onWrite,
    } = this.props

    this.setState({
      editorVisibility: false,
    })
    if (onWrite) {
      onWrite(title, contents)
    }
  }

  toggleEditor () {
    this.setState({
      editorVisibility: !this.state.editorVisibility,
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
      editorVisibility: false,
    }
  }

  render () {
    const {
      editorVisibility,
    } = this.state
    return (
      <div className="row justify-content-md-center">
        <div className="col col-sm-12">
          {editorVisibility && <Editor
            onCancel={this.cancelWriting.bind(this)}
            onWrite={this.handleWriting.bind(this)} />}
          <div className="text-right">
            {!editorVisibility && this.renderWritingButton()}
          </div>
          <Topics {...this.props} />
          <div className="text-right">
            {!editorVisibility && this.renderWritingButton()}
          </div>
        </div>
      </div>
    )
  }
}
