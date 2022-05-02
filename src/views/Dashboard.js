 import React from "react";
 import h337 from "heatmap.js";
 import l_webpage from "assets/img/91092828-2644-4d9d-b0a2-09f06f23f6fd.png";
 import gh_webpage from "assets/img/f8eccf87-9b5d-4f24-9032-64e67e783d51.png";
 import defaultImg from "assets/img/default.jpg";
 import index from "assets/img/loading-bubbles.svg";
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Form,
  OverlayTrigger,
  Tooltip,
  Image,
} from "react-bootstrap";

const imageMap = new Map();
var imageSrc = defaultImg;
imageMap.set("f8eccf87-9b5d-4f24-9032-64e67e783d51", gh_webpage);
imageMap.set("91092828-2644-4d9d-b0a2-09f06f23f6fd", l_webpage);

class Dashboard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      page_id : "",
      xy : []
    }
  }


  handleSubmit = (event) => {
    this.setState({page_id: this.element.value}, () =>
     console.log(this.state.page_id));
     imageSrc = imageMap.get(this.state.page_id);

    fetch(`https://heatmap-api.herokuapp.com//get_xy/${this.element.value}`)
        .then((res) => res.json())
        .then((data) => {
          this.setState({ xy : data }, () => {
            var heatmapInstance = h337.create({
            container: document.querySelector('.heatmap'),
            radius: 30
            });
            heatmapInstance.setData({max: 2, data: this.state.xy["data"]});
            console.log("heatmap image url : ",heatmapInstance.getDataURL());
          })
        })
        .catch(console.log)

    event.preventDefault();
}

render() {
 return (
  <>
    <Container fluid>
    <Row>      
      <Col lg="5" sm="3"> 
        <Card>
        <Card.Header>Enter Page ID</Card.Header>
        <Card.Header>
        </Card.Header>
        <Card.Body>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control type="text" ref={el => this.element = el} name="page_id" placeholder="Enter page id" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        </Card.Body>
        <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-history"></i>
                  Updated 3 minutes ago
                </div>
              </Card.Footer>
        </Card>
      </Col>

      </Row>

      <Row>
      <Col lg="15" sm="15">
            <Card>
              <Card.Header>
                <div className="legend">
                  <i className="fas fa-circle text-info"></i>  Low&nbsp; &nbsp; 
                  <i className="fas fa-circle text-success"></i>  Moderate&nbsp; &nbsp; 
                  <i className="fas fa-circle text-danger"></i>  High&nbsp; &nbsp; 
                </div>
              </Card.Header>
              <Card.Body>
                <div className="heatmap" fluid>
                  <Image src={imageSrc} alt="webpage image"/>
                </div>
              </Card.Body>
            </Card>
      </Col>
      </Row>
    </Container>
    </>
  );
  }
}
export default Dashboard;
