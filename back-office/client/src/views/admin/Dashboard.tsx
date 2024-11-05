
const Dashboard = () => {
  return (
    <div>
        <div className="searchbar2">
            <input type="text" placeholder="Search" />
            <div className="searchbtn">
                <i className="fas fa-search srchicn"></i>
            </div>
        </div>
      <div className="box-container">
        <div className="box box1">
          <div className="text">
            <h2 className="topic-heading">60.5k</h2>
            <h2 className="topic">Article Views</h2>
          </div>
          <i className="fas fa-eye icon"></i>                
        </div>
        <div className="box box2">
            <div className="text">
                <h2 className="topic-heading">150</h2>
                <h2 className="topic">Likes</h2>
            </div>
            <i className="fas fa-thumbs-up icon"></i>
        </div>

        <div className="box box3">
            <div className="text">
                <h2 className="topic-heading">320</h2>
                <h2 className="topic">Comments</h2>
            </div>
            <i className="fas fa-comments icon"></i>
        </div>

        <div className="box box4">
            <div className="text">
                <h2 className="topic-heading">70</h2>
                <h2 className="topic">Published</h2>
            </div>
            <i className="fas fa-check icon"></i>
        </div>
      </div>
      <div className="report-container">
        <div className="report-header">
            <h1 className="recent-Articles">Recent Articles</h1>
            <button className="view">View All</button>
        </div>

        <div className="report-body">
            <div className="report-topic-heading">
                <h3 className="t-op">Article</h3>
                <h3 className="t-op">Views</h3>
                <h3 className="t-op">Comments</h3>
                <h3 className="t-op">Status</h3>
            </div>

            <div className="items">
                <div className="item1">
                    <h3 className="t-op-nextlvl">Article 73</h3>
                    <h3 className="t-op-nextlvl">2.9k</h3>
                    <h3 className="t-op-nextlvl">210</h3>
                    <h3 className="t-op-nextlvl label-tag">Published</h3>
                </div>

                <div className="item1">
                    <h3 className="t-op-nextlvl">Article 72</h3>
                    <h3 className="t-op-nextlvl">1.5k</h3>
                    <h3 className="t-op-nextlvl">360</h3>
                    <h3 className="t-op-nextlvl label-tag">Published</h3>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Dashboard