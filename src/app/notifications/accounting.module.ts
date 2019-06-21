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
import {FimsSharedModule} from '../common/common.module';
import {AccountingRoutes} from './accounting.routing';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {GeneralLedgerComponent} from './general-ledger.component';
import {AccountDetailComponent} from './accounts/account.detail.component';
import {AccountFormComponent} from './accounts/form/form.component';
import {CreateAccountFormComponent} from './accounts/form/create/create.form.component';
import {EditAccountFormComponent} from './accounts/form/edit/edit.form.component';
import {AccountEntryListComponent} from './accounts/entries/account-entry.list.component';
import {LedgerFormComponent} from './form/sms/form.component';
import {EditLedgerFormComponent} from './form/sms/edit/edit.form.component';
import {CreateLedgerFormComponent} from './form/sms/create/create.form.component';
import {SmsConfigurationExistsGuard} from './sms-configuration-exists.guard';
import {AccountExistsGuard} from './accounts/account-exists.guard';
import {AccountingStore, accountingStoreFactory} from './store/index';
import {Store} from '@ngrx/store';
import {AccountCommandNotificationEffects} from './store/account/task/effects/notification.effects';
import {EffectsModule} from '@ngrx/effects';
import {AccountCommandApiEffects} from './store/account/task/effects/service.effects';
import {AccountNotificationEffects} from './store/account/effects/notification.effects';
import {AccountEntryApiEffects} from './store/account/entries/effects/service.effect';
import {AccountRouteEffects} from './store/account/effects/route.effects';
import {AccountApiEffects} from './store/account/effects/service.effects';
import {LedgerNotificationEffects} from './store/ledger/effects/notification.effects';
import {LedgerRouteEffects} from './store/ledger/effects/route.effects';
import {LedgerApiEffects} from './store/ledger/effects/service.effects';
import {AccountCommandRouteEffects} from './store/account/task/effects/route.effects';
import {TranslateModule} from '@ngx-translate/core';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatOptionModule,
  MatRadioModule,
  MatToolbarModule
} from '@angular/material';
import {CommonModule} from '@angular/common';
import {CovalentDataTableModule, CovalentStepsModule} from '@covalent/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    RouterModule.forChild(AccountingRoutes),
    FimsSharedModule,
    TranslateModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatOptionModule,
    CovalentDataTableModule,
    CovalentStepsModule,
 
    EffectsModule.forRoot([
      LedgerApiEffects,
      LedgerRouteEffects,
      LedgerNotificationEffects,
      
      AccountApiEffects,
      AccountRouteEffects,
      AccountNotificationEffects,
      AccountEntryApiEffects,
      AccountCommandApiEffects,
      AccountCommandRouteEffects,
      AccountCommandNotificationEffects,

    ])
  ],
  declarations: [
    GeneralLedgerComponent,
    LedgerFormComponent,
    CreateLedgerFormComponent,
    EditLedgerFormComponent,
    AccountEntryListComponent,
    AccountDetailComponent,
    AccountFormComponent,
    CreateAccountFormComponent,
    EditAccountFormComponent,
  ],
  providers: [
    SmsConfigurationExistsGuard,
    AccountExistsGuard,
    { provide: AccountingStore, useFactory: accountingStoreFactory, deps: [Store]}
  ]
})
export class AccountingModule {}
