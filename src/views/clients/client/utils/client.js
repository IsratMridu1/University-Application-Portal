import BaseEntity from "../../../../utility/baseEntity";

export default class Client extends BaseEntity {
  fullName = "";
  email = "";
  clientLogo = "";
  phoneNumber = "";
  countryId = "";
  stateId = "";
  cityId = "";
  addressLine = "";
  clientTypeId = "";
}
