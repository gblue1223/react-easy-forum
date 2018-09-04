import React from 'react'
import lucidfish from './translation'

import Topics from './topics'

export default class EasyForum extends React.PureComponent {
  static get defaultProps () {
    return {
      theme: {
        writingIcon: <em className="fa fa-edit fa-fw" />,
      },
      data: [
        { idx: 1,
          title: 'title1',
          writer: 'alice',
          date: new Date(),
          views: 1,
          comments: 1 },
        { idx: 2,
          title: 'title2',
          writer: 'whiteRabbit',
          date: new Date(),
          views: 1,
          comments: 1 },
        { idx: 3,
          title: 'title3',
          writer: 'eggBrother',
          date: new Date(),
          views: 1,
          comments: 1 },
      ],
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
