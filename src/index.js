import React from 'react'
import lucidfish from './translation'

import Topics from './topics'

export default class EasyForum extends React.PureComponent {
  static get defaultProps () {
    return {
      theme: {
        writingIcon: <em className="fa fa-edit fa-fw" />,
      },
      data: [],
    }
  }

  renderWritingButton () {
    const { writingIcon } = this.props.theme
    return (
      <button className="btn btn-primary m-1">
        {writingIcon}
        {lucidfish.forum.write}
      </button>
    )
  }

  render () {
    return (
      <div className="row justify-content-md-center">
        <div className="col col-sm-12">
          <div className="text-right">
            {this.renderWritingButton()}
          </div>
          <Topics {...this.props} />
          <div className="text-right">
            {this.renderWritingButton()}
          </div>
        </div>
      </div>
    )
  }
}
