import BaseEntity from "../../../../utility/baseEntity";

export default class CompanyBranch extends BaseEntity {
  code = "";
  name = "";
  address = "";
  cityId = 0;
  stateId = 0;
  CountryId = 0;
  phoneNumber = "";
  telephoneNumber = "";
  postalCode = "";
}
