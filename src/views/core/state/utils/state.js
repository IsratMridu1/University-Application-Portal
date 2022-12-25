import BaseEntity from "../../../../utility/baseEntity";

export default class State extends BaseEntity {
  name = "";
  constructor() {
    super();
    this.state = {
        countries: [],
    };
 }
}



  
