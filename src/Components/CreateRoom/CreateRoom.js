import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createRoom } from "../../Redux/Reducers/RoomReducer";

class CreateRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      owner: "",
      title: "",
      url: "",
      description: "",
      categories: []
    };
  }

  createRoomBtn = () => {
    let { title, url, owner, description, categories } = this.state;
    console.log(title, url, owner, description, categories);
    this.props.createRoom({ title, url, owner, description, categories });
  };

  updateCategories = category => {
    let { categories } = this.state;

    if (categories.includes(category)) {
      let newArr = categories.filter(cat => cat !== category);
      this.setState({
        categories: newArr
      });
    } else {
      this.setState({
        categories: [...categories, category]
      });
    }
  };

  render() {
    const { categories } = this.state;
    console.log(categories);
    return (
      <div>
        <div className="container" style={{ marginTop: "100px" }}>
          <form>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Title</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                placeholder="Title"
                onChange={e =>
                  this.setState({
                    title: e.target.value
                  })
                }
              />
            </div>

            <div className="form-group">
              <label htmlFor="formGroupExampleInput2">Video URL</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput2"
                placeholder="URL"
                onChange={e =>
                  this.setState({
                    url: e.target.value
                  })
                }
              />
            </div>
            <div class="form-group">
              <label htmlFor="exampleFormControlTextarea1">Description</label>
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                placeholder="Description"
                onChange={e =>
                  this.setState({
                    description: e.target.value
                  })
                }
              />
            </div>
            <div className="form-group row">
              {/* <div className="col-sm-2">Checkbox</div> */}

              <div className="col-sm-10">
                <label htmlFor="exampleFormControlTextarea1">Category</label>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="gridCheck1"
                    onChange={() => this.updateCategories("music")}
                  />
                  <label className="form-check-label" for="gridCheck1">
                    Music
                  </label>
                  <div>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="gridCheck1"
                      onChange={() => this.updateCategories("gaming")}
                    />
                    <label className="form-check-label" for="gridCheck1">
                      Gaming
                    </label>
                  </div>{" "}
                  <div>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="gridCheck1"
                      onChange={() => this.updateCategories("education")}
                    />
                    <label className="form-check-label" for="gridCheck1">
                      Education
                    </label>
                  </div>{" "}
                  <div>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="gridCheck1"
                      onChange={() => this.updateCategories("comedy")}
                    />
                    <label className="form-check-label" for="gridCheck1">
                      Comedy
                    </label>
                  </div>
                  <div>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="gridCheck1"
                      onChange={() => this.updateCategories("sports")}
                    />
                    <label className="form-check-label" for="gridCheck1">
                      Sports
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <Link to="/dashboard">
            <button
              type="submit"
              class="btn btn-primary"
              onClick={() => this.createRoomBtn()}>
              Create Room
            </button>
          </Link>
          <Link
            className="btn btn-danger"
            to="/dashboard"
            style={{ marginLeft: "10px" }}>
            Cancel
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    id: state.id,
    roomName: state.roomName,
    description: state.description,
    owner: state.ownder,
    videoUrl: state.videoUrl,
    categories: state.categories
  };
};

const mapDispatchToProps = {
  createRoom: createRoom
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateRoom);

// export default CreateRoom;
