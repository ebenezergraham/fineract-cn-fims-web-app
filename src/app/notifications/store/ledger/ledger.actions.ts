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
import {Action} from '@ngrx/store';
import {type} from '../../../store/util';
import {Error} from '../../../services/domain/error.model';
import {RoutePayload} from '../../../common/store/route-payload';
import {Configuration} from "../../../services/notifications/domain/configuration.model";

export const LOAD = type('[Configuration] Load');
export const SELECT = type('[Configuration] Select');

export const CREATE = type('[Configuration] Create');
export const CREATE_SUCCESS = type('[Configuration] Create Success');
export const CREATE_FAIL = type('[Configuration] Create Fail');


export const UPDATE = type('[Configuration] Update');
export const UPDATE_SUCCESS = type('[Configuration] Update Success');
export const UPDATE_FAIL = type('[Configuration] Update Fail');

export const DELETE = type('[Configuration] Delete');
export const DELETE_SUCCESS = type('[Configuration] Delete Success');
export const DELETE_FAIL = type('[Configuration] Delete Fail');

export const RESET_FORM = type('[Configuration] Reset Form');

export interface LedgerRoutePayload extends RoutePayload {
  configuration: Configuration;
}


export class LoadAction implements Action {
  readonly type = LOAD;

  constructor(public payload: Configuration) { }
}

export class SelectAction implements Action {
  readonly type = SELECT;

  constructor(public payload: string) { }
}

export class CreateLedgerAction implements Action {
  readonly type = CREATE;

  constructor(public payload: LedgerRoutePayload) { }
}

export class CreateLedgerSuccessAction implements Action {
  readonly type = CREATE_SUCCESS;

  constructor(public payload: LedgerRoutePayload) { }
}

export class CreateLedgerFailAction implements Action {
  readonly type = CREATE_FAIL;

  constructor(public payload: Error) { }
}

export class CreateSubLedgerAction implements Action {
  readonly type = CREATE_SUB_LEDGER;

  constructor(public payload: CreateSubLedgerPayload) { }
}

export class CreateSubLedgerSuccessAction implements Action {
  readonly type = CREATE_SUB_LEDGER_SUCCESS;

  constructor(public payload: CreateSubLedgerPayload) { }
}

export class CreateSubLedgerFailAction implements Action {
  readonly type = CREATE_SUB_LEDGER_FAIL;

  constructor(public payload: Error) { }
}

export class UpdateLedgerAction implements Action {
  readonly type = UPDATE;

  constructor(public payload: LedgerRoutePayload) { }
}

export class UpdateLedgerSuccessAction implements Action {
  readonly type = UPDATE_SUCCESS;

  constructor(public payload: LedgerRoutePayload) { }
}

export class UpdateLedgerFailAction implements Action {
  readonly type = UPDATE_FAIL;

  constructor(public payload: Error) { }
}

export class DeleteLedgerAction implements Action {
  readonly type = DELETE;

  constructor(public payload: LedgerRoutePayload) { }
}

export class DeleteLedgerSuccessAction implements Action {
  readonly type = DELETE_SUCCESS;

  constructor(public payload: LedgerRoutePayload) { }
}

export class DeleteLedgerFailAction implements Action {
  readonly type = DELETE_FAIL;

  constructor(public payload: Error) { }
}

export class LoadTrialBalanceAction implements Action {
  readonly type = LOAD_TRIAL_BALANCE;

  constructor(public payload: boolean) { }
}

export class LoadTrialBalanceActionComplete implements Action {
  readonly type = LOAD_TRIAL_BALANCE_COMPLETE;

  constructor(public payload: TrialBalance) { }
}

export class LoadChartOfAccountsAction implements Action {
  readonly type = LOAD_CHART_OF_ACCOUNTS;

  constructor() { }
}

export class LoadChartOfAccountsActionComplete implements Action {
  readonly type = LOAD_CHART_OF_ACCOUNTS_COMPLETE;

  constructor(public payload: ChartOfAccountEntry[]) { }
}

export class ResetLedgerFormAction implements Action {
  readonly type = RESET_FORM;

  constructor() {}
}

export type Actions
  = LoadAllTopLevel
  | LoadAllTopLevelComplete
  | LoadAction
  | SelectAction
  | CreateLedgerAction
  | CreateLedgerSuccessAction
  | CreateLedgerFailAction
  | CreateSubLedgerAction
  | CreateSubLedgerSuccessAction
  | CreateSubLedgerFailAction
  | UpdateLedgerAction
  | UpdateLedgerSuccessAction
  | UpdateLedgerFailAction
  | DeleteLedgerAction
  | DeleteLedgerSuccessAction
  | DeleteLedgerFailAction
  | LoadTrialBalanceAction
  | LoadTrialBalanceActionComplete
  | LoadChartOfAccountsAction
  | LoadChartOfAccountsActionComplete
  | ResetLedgerFormAction;
