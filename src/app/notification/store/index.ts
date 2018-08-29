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
import * as fromRoot from '../../store';
import * as fromCustomers from './customers.reducer';
import * as fromCustomerTasks from './customerTasks/customer-tasks.reducer';
import * as fromCustomerIdentificationCards from './identityCards/identity-cards.reducer';
import * as fromCatalogs from './catalogs/catalog.reducer';
import * as fromCommands from './commands/commands.reducer';
import * as fromScans from './identityCards/scans/scans.reducer';
import * as fromTasks from './tasks/tasks.reducer';
import * as fromPayrollDistribution from './payroll/payroll.reducer';

import {ActionReducer, Store} from '@ngrx/store';
import {createReducer} from '../../store/index';
import {createSelector} from 'reselect';
import {
  createResourceReducer,
  getResourceAll,
  getResourceLoadedAt,
  getResourceSelected,
  ResourceState
} from '../../common/store/resource.reducer';
import {createFormReducer, FormState, getFormError} from '../../common/store/form.reducer';

export interface State extends fromRoot.State {
  smsConfiguration: ResourceState;
  smsForm: FormState;
}

const reducers = {
  smsConfiguration: createResourceReducer('SMSConfiguration', fromSMSConfiguration.reducer),
  smsConfigurationForm: createFormReducer('SMS Configuration'),
  };

export class SMSConfigurationStore extends Store<State> {}

export const smsConfigurationModuleReducer: ActionReducer<State> = createReducer(reducers);

export function customerStoreFactory(appStore: Store<fromRoot.State>) {
  appStore.replaceReducer(smsConfigurationModuleReducer);
  return appStore;
}

export const getSMSConfigurationState = (state: State) => state.smsConfiguration;

export const getSMSConfigurationFormState = (state: State) => state.smsForm;
export const getSMSConfigurationFormError = createSelector(getSMSConfigurationFormState, getFormError);

export const getSMSConfigurationLoadedAt = createSelector(getSMSConfigurationState, getResourceLoadedAt);
export const getSelectedSMSConfiguration = createSelector(getSMSConfigurationState, getResourceSelected);
