import React from 'react'
import lucidfish from './translation'

export default class Topics extends React.PureComponent {
  renderItem ({ idx, title, writer, date, views, comments }) {
    return (
      <tr key={idx}>
        <td>
          <h4>{idx}</h4>
        </td>
        <td>
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
              <strong>{writer}</strong>
              {' '}{lucidfish.forum.by}
            </small>
            <small>
              <strong>{new Date(date).toLocaleString()}</strong>
              {' '}{lucidfish.forum.started}
            </small>
          </div>
        </td>
      </tr>
    )
  }

  render () {
    const { data } = this.props
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th className="h4" style={{width: '5%'}}>{}</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => this.renderItem(item))}
        </tbody>
      </table>
    )
  }
}
