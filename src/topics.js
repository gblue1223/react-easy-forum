import React from 'react'
import lucidfish from './translation'

export default class Topics extends React.PureComponent {
  renderTopic ({ idx, title, writer_id, writing_time, views, comments }) {
    const { onRead } = this.props
    return (
      <tr key={idx}>
        <td>
          <h4>{idx}</h4>
        </td>
        <td style={{cursor:'pointer'}} onClick={onRead.bind(this, idx)}>
          <h4>
            <strong>{title}</strong>
          </h4>
          <div className="text-muted text-sm">
            <span>
              <strong className="mr-1">{views}</strong>
              {lucidfish.forum.views}
            </span>
            <span className="mx-1" />
            <span>
              <strong className="mr-1">{comments}</strong>
              {lucidfish.forum.comments}
            </span>
          </div>
        </td>
        <td className="text-right d-none d-lg-table-cell">
          <div className="text-muted">
            <small className="mr-1">
              <strong>{writer_id}</strong>
              {' '}{lucidfish.forum.by}
            </small>
            <small>
              <strong>{new Date(writing_time).toLocaleString()}</strong>
              {' '}{lucidfish.forum.started}
            </small>
          </div>
        </td>
      </tr>
    )
  }

  render () {
    const { topics } = this.props
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th className="h4" style={{width: '5%'}}>{}</th>
          </tr>
        </thead>
        <tbody>
          {topics.map(topic => this.renderTopic(topic))}
        </tbody>
      </table>
    )
  }
}
