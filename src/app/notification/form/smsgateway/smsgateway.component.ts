/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import {Component, Input} from '@angular/core';
import {FormComponent} from '../../../common/forms/form.component';
import {FormBuilder, Validators} from '@angular/forms';
import {FimsValidators} from '../../../common/validator/validators';

export interface SMSGatewayFormData {
  identifier: string;
  accountSID: string;
  authenticationToken: string;
  phoneNumber: string;
}

@Component({
  selector: 'fims-sms-gateway-form',
  templateUrl: './smsgateway.component.html'
})
export class SMSGatewayFormComponent extends FormComponent<SMSGatewayFormData> {

  @Input() set formData(formData: SMSGatewayFormData) {

    this.form = this.formBuilder.group({
      identifier: [formData.identifier, [Validators.required, Validators.minLength(3), Validators.maxLength(32), FimsValidators.urlSafe]],
      accountSID: [formData.accountSID, [Validators.required, Validators.maxLength(256)]],
      authenticationToken: [formData.authenticationToken, Validators.maxLength(256)],
      phoneNumber: [formData.phoneNumber, Validators.maxLength(256)],
    });
  };

  @Input() editMode: boolean;

  constructor(private formBuilder: FormBuilder) {
    super();
  }

  get formData(): SMSGatewayFormData {
    return {
      identifier: this.form.get('identifier').value,
      accountSID: this.form.get('accountSID').value,
      authenticationToken: this.form.get('authenticationToken').value,
      phoneNumber: this.form.get('phoneNumber').value,
    }
  }
}
