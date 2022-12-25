import BaseEntity from "../../../../utility/baseEntity";

export default class CompanyContactInformation extends BaseEntity {
  email = "";
  website = "";
  address = "";
  cityId = 0;
  stateId = 0;
  CountryId = 0;
  phoneNumber = "";
  telephoneNumber = "";
  postalCode = "";
}
