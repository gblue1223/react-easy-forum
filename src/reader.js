import React from 'react'
import lucidfish from './translation'

export default class ReaderView extends React.PureComponent {
  render () {
    const {
      title,
      contents,
      onClose,
    } = this.props

    return (
      <div>
        <div className="row justify-content-md-center">
          <div className="col col-sm-12">
            <div className="card card-default">
              <div className="card-header">
                <div className="row">
                  <div className="col-sm-11">
                    <h2>{title}</h2>
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
                    {contents}
                  </div>
                </div>
              </div>
              <div className="card-footer">
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
