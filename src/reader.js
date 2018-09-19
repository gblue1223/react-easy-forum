import React from 'react'
import lucidfish from './translation'

export default class ReaderView extends React.PureComponent {
  renderComments (idx) {
    const {
      comments,
      onComment,
    } = this.props

    const handleSubmit = e => {
      e.preventDefault()
      if (onComment) {
        onComment(idx, this.contentsRef.value)
      }
      this.contentsRef.value = ''
    }
    return (
      <div>
        <ol className="list-group">
          {comments && comments.map((comment, i) => (
            <li key={i} className="list-group-item">
              <strong>{comment.writer_id}</strong>
              <span className="ml-2">
                <pre>{comment.contents}</pre>
              </span>
            </li>
          ))}
        </ol>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <textarea ref={r => { this.contentsRef = r }} className="form-control" aria-label="With textarea" />
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

  render () {
    const {
      idx,
      title,
      contents,
      onClose,
      onDelete,
      onModify,
    } = this.props
    return (
      <div>
        <div className="row justify-content-md-center">
          <div className="col col-sm-12">
            <div className="card card-default">
              <div className="card-header">
                <div className="row">
                  <div className="col-sm-11">
                    <h2>{`${idx} ${title}`}</h2>
                  </div>
                  <div className="col-sm-1 pull-right">
                    <button type="button" className="btn btn-default" onClick={onClose}>
                      <em className="fa fa-close fa-fw" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-12 m-1" style={{ minHeight: '200px' }}>
                    {/*{contents && <div dangerouslySetInnerHTML={{ __html: contents }}/>}*/}
                    <pre>{contents}</pre>
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <div className="row">
                  <div className="col-12">
                    <div className="clearfix mb-2">
                      <div className="pull-left">
                      </div>
                      <div className="pull-right">
                        <button type="button" className="btn btn-danger" onClick={onDelete}>
                          <em className="fa fa-trash fa-fw" />
                          {lucidfish.common.delete}
                        </button>
                        <button type="button" className="btn btn-primary m-t-10" onClick={onModify}>
                          <em className="fa fa-check-square-o fa-fw" />
                          {lucidfish.forum.modify}
                        </button>
                      </div>
                    </div>
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
