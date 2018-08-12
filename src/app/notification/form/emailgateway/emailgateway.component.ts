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

export interface EmailGatewayFormData {
  identifier: string;
  serverAddress: string;
  emailAddress: string;
  password: string;
  tls:boolean;
  port: number;
}

@Component({
  selector: 'fims-customer-detail-form',
  templateUrl: './emailgateway.component.html'
})
export class EmailGatewayFormComponent extends FormComponent<EmailGatewayFormData> {

  @Input() set formData(formData: EmailGatewayFormData) {

    this.form = this.formBuilder.group({
      identifier: [formData.identifier, [Validators.required, Validators.minLength(3), Validators.maxLength(32), FimsValidators.urlSafe]],
      serverAddress: [formData.serverAddress, [Validators.required, Validators.maxLength(256)]],
      emailAddress: [formData.emailAddress, Validators.maxLength(256)],
      password: [formData.password, Validators.maxLength(256)],
      tls: [formData.tls, Validators.maxLength(25)],
      port: [formData.port, Validators.maxLength(25)],
    });
  };

  @Input() editMode: boolean;

  constructor(private formBuilder: FormBuilder) {
    super();
  }

  get formData(): EmailGatewayFormData {
    return {
      identifier: this.form.get('identifier').value,
      serverAddress: this.form.get('serverAddress').value,
      emailAddress: this.form.get('emailAddress').value,
      password: this.form.get('password').value,
      tls: this.form.get('tls').value,
      port: this.form.get('port').value,
    }
  };
}
