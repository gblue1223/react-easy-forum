import React from 'react'
import lucidfish from './translation'

export default class ReaderView extends React.PureComponent {
  handleInputChange (e) {
    const target = e.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    this.setState({ [name]: value })
  }

  openCommentModifier (wllBeModifiedIdx, modifiedContents) {
    this.setState({
      wllBeModifiedIdx,
      modifiedContents,
    })
  }

  closeCommentModifier () {
    this.setState({
      wllBeModifiedIdx: 0,
    })
  }

  renderComment (topic_idx, comment) {
    const {
      onDeleteComment,
      onModifyComment,
    } = this.props

    const {
      wllBeModifiedIdx,
      modifiedContents,
    } = this.state

    const visibleModifier = wllBeModifiedIdx === comment.idx

    const cancel = () => {
      this.closeCommentModifier()
    }

    const modify = () => {
      if (onModifyComment) {
        onModifyComment(wllBeModifiedIdx, modifiedContents)
        this.setState({
          contents: modifiedContents,
        })
      }
      this.closeCommentModifier()
    }

    const del = () => {
      if (onDeleteComment) {
        onDeleteComment(topic_idx, comment.idx)
      }
      this.closeCommentModifier()
    }

    return (
      <li key={comment.idx} className="list-group-item">
        <div className="row">
          <div className="col-sm-2">
            <strong>{comment.writer_id}</strong>
          </div>
          <div className={visibleModifier ? 'col-sm-10' : 'col-sm-8'}>
            {
              !visibleModifier
                ? <pre>{comment.contents}</pre>
                : <div className="input-group">
                    <textarea
                      className="form-control"
                      aria-label="With textarea"
                      name="modifiedContents"
                      value={modifiedContents}
                      onChange={this.handleInputChange.bind(this)}
                    />
                  <div className="input-group-append">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                      onClick={cancel}
                    >
                      {lucidfish.common.cancel}
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-primary"
                      onClick={modify}
                    >
                      {lucidfish.common.save}
                    </button>
                  </div>
                </div>
            }
          </div>
          {
            visibleModifier || !comment.allowEdit
              ? null
              : <div className="col-sm-2 text-right">
                <button
                  type="button"
                  className="btn btn-sm btn-danger"
                  onClick={del}
                >
                  <em className="fa fa-trash fa-fw" />
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-primary m-t-10"
                  onClick={this.openCommentModifier.bind(this, comment.idx, comment.contents)}
                >
                  <em className="fa fa-check-square-o fa-fw" />
                </button>
              </div>
          }
        </div>
      </li>
    )
  }

  renderComments (topic_idx) {
    const {
      comments,
      onWriteComment,
    } = this.props

    const {
      contents,
    } = this.state

    const write = e => {
      e.preventDefault()
      if (onWriteComment) {
        onWriteComment(topic_idx, contents)
      }
    }

    return (
      <div>
        <ol className="list-group">
          {comments && comments.map(comment => this.renderComment(topic_idx, comment))}
        </ol>
        <form onSubmit={write}>
          <div className="input-group">
            <textarea
              className="form-control"
              aria-label="With textarea"
              name="contents"
              value={contents}
              onChange={this.handleInputChange.bind(this)}
            />
            <div className="input-group-append">
              <button type="submit" className="btn btn-outline-secondary">
                {lucidfish.forum.comment}
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }

  constructor (props) {
    super(props)
    this.state = {
      visibleModifier: false,
    }
  }

  render () {
    const {
      idx,
      title,
      contents,
      allowEdit,
      onCloseTopic,
      onDeleteTopic,
      onModifyTopic,
    } = this.props
    return (
      <div>
        <div className="row justify-content-md-center">
          <div className="col col-sm-12">
            <div className="card card-default">
              <div className="card-header">
                <div className="row">
                  <div className="col-sm-12 d-flex justify-content-between">
                    <div>
                      <h2>{`${idx || ''} ${title || ''}`}</h2>
                    </div>
                    <div>
                      <button type="button" className="btn btn-default" onClick={onCloseTopic}>
                        <em className="fa fa-close fa-fw" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-12 m-1" style={{ minHeight: '200px' }}>
                    {/*{contents && <div dangerouslySetInnerHTML={{ __html: contents }}/>}*/}
                    <pre>{contents || ''}</pre>
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <div className="row">
                  <div className="col-12">
                    {
                      !allowEdit ? null : (
                        <div className="clearfix mb-2">
                          <div className="pull-left">
                          </div>
                          <div className="pull-right">
                            <button type="button" className="btn btn-danger" onClick={onDeleteTopic}>
                              <em className="fa fa-trash fa-fw" />
                              {lucidfish.common.delete}
                            </button>
                            <button type="button" className="btn btn-primary m-t-10" onClick={onModifyTopic}>
                              <em className="fa fa-check-square-o fa-fw" />
                              {lucidfish.forum.modify}
                            </button>
                          </div>
                        </div>
                      )
                    }
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    {this.renderComments(idx)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
