import { Request, Response } from "express-serve-static-core";
import { ParsedQs } from "qs";


export interface FormDataType {
  first_name: string | undefined;
  last_name: string | undefined;
  mobile_number: string | undefined;
  email: string | undefined;
  gender: string | undefined;
  relationship: string | undefined;
  has_gov_profile: boolean | undefined;
  is_visa_holder: boolean | undefined;
  my_gov: boolean | undefined;
  my_gov_username: string | undefined;
  my_gov_password: string | undefined;
  security_question: string | undefined;
  security_answer: string | undefined;
  ato: boolean | undefined;
  position: string | undefined;
  qualification: string | undefined;
  prev_work: string | undefined;
  skills: string | undefined;
  id_card: string | undefined;
}
export interface RequestResponse{
    res: Response<any, Record<string, any>, number>;
    req: Request<{}, any, any, ParsedQs>;
}
