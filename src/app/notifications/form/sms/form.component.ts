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
import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormComponent} from '../../../common/forms/form.component';
import {TdStepComponent} from '@covalent/core';
import {FormBuilder, Validators} from '@angular/forms';
import {FimsValidators} from '../../../common/validator/validators';
import {SmsConfiguration} from "../../../services/notifications/domain/sms-configuration.model";

@Component({
  selector: 'fims-sms-configuration-form-component',
  templateUrl: './form.component.html'
})
export class SmsConfigurationFormComponent extends FormComponent<SmsConfiguration> implements OnInit {

  @ViewChild('detailsStep') step: TdStepComponent;

  @Input() smsConfiguration: SmsConfiguration;

  @Input() editMode: boolean;

  @Output('onSave') onSave = new EventEmitter<SmsConfiguration>();

  @Output('onCancel') onCancel = new EventEmitter<void>();

  constructor(private formBuilder: FormBuilder) {
    super();
  }

  get formData(): SmsConfiguration {
    return null;
  }

  ngOnInit(): void {
    this.openDetailStep();

    this.form = this.formBuilder.group({
      'identifier': [this.smsConfiguration.identifier, [Validators.required, Validators.minLength(3), Validators.maxLength(32),
        FimsValidators.urlSafe]],
      'accountSID': [this.ledger.name, [Validators.required, Validators.maxLength(256)]],
      'authenticationToken': [this.ledger.showAccountsInChart, [Validators.required]],
      'authenticationToken': [this.ledger.showAccountsInChart, [Validators.required]]
    });
  }

  showIdentifierValidationError(): void {
    this.setError('identifier', 'unique', true);
    this.openDetailStep();
  }

  openDetailStep(): void {
    this.step.open();
  }

  save(): void {
    const smsConfiguration: SmsConfiguration = {
      identifier: this.form.get('identifier').value,
      account_sid: this.form.get('accountSID').value,
      auth_token: this.form.get('authenticationToken').value,
    };

    this.onSave.emit(smsConfiguration);
  }

  cancel(): void {
    this.onCancel.emit();
  }
}
