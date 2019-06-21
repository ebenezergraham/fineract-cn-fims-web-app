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
import {Routes} from '@angular/router';
import {GeneralLedgerComponent} from './general-ledger.component';
import {AccountDetailComponent} from './accounts/account.detail.component';
import {CreateAccountFormComponent} from './accounts/form/create/create.form.component';
import {EditAccountFormComponent} from './accounts/form/edit/edit.form.component';
import {AccountEntryListComponent} from './accounts/entries/account-entry.list.component';
import {CreateLedgerFormComponent} from './form/sms/create/create.form.component';
import {EditLedgerFormComponent} from './form/sms/edit/edit.form.component';
import {SmsConfigurationExistsGuard} from './sms-configuration-exists.guard';
import {AccountExistsGuard} from './accounts/account-exists.guard';

export const AccountingRoutes: Routes = [
  {path: '', component: GeneralLedgerComponent},
  {
    path: 'configuration/email/:id',
    component: SubLedgerComponent,
    canActivate: [SmsConfigurationExistsGuard],
    data: {
      hasPermission: { id: 'notifications_configurations', accessLevel: 'READ' }
    },
    children: [
      {
        path: '',
        component: SubLedgerDetailComponent,
      },
      {
        path: 'edit',
        component: EditLedgerFormComponent,
        data: { hasPermission: { id: 'accounting_ledgers', accessLevel: 'CHANGE' }}
      },
      {
        path: 'ledgers',
        component: SubLedgerListComponent,
      },
      {
        path: 'ledgers/edit',
        component: EditLedgerFormComponent,
        data: { hasPermission: { id: 'accounting_ledgers', accessLevel: 'CHANGE' }}
      },
      {
        path: 'ledgers/create',
        component: CreateLedgerFormComponent,
        data: { hasPermission: { id: 'accounting_ledgers', accessLevel: 'CHANGE' }}
      },
      {
        path: 'accounts/create',
        component: CreateAccountFormComponent,
        data: {
          hasPermission: {id: 'accounting_accounts', accessLevel: 'CHANGE'}
        }
      }
    ]
  },
  {
    path: 'create',
    component: CreateLedgerFormComponent,
    data: {hasPermission: {id: 'accounting_ledgers', accessLevel: 'CHANGE'}}
  },
  {
    path: 'accounts/detail/:id',
    component: AccountDetailComponent,
    canActivate: [AccountExistsGuard],
    data: {hasPermission: {id: 'accounting_accounts', accessLevel: 'READ'}}
  },
  {
    path: 'accounts/detail/:id/edit',
    component: EditAccountFormComponent,
    canActivate: [AccountExistsGuard],
    data: {hasPermission: {id: 'accounting_accounts', accessLevel: 'CHANGE'}}
  },
  {
    path: 'accounts/detail/:id/tasks',
    component: AccountStatusComponent,
    canActivate: [AccountExistsGuard],
    data: {hasPermission: {id: 'accounting_accounts', accessLevel: 'READ'}}
  },
  {
    path: 'accounts/detail/:id/activities',
    component: AccountActivityComponent,
    canActivate: [AccountExistsGuard],
    resolve: {commands: CommandsResolver},
    data: {hasPermission: {id: 'accounting_accounts', accessLevel: 'READ'}}
  },
  {
    path: 'accounts/detail/:id/entries',
    component: AccountEntryListComponent,
    canActivate: [AccountExistsGuard],
    data: {hasPermission: {id: 'accounting_accounts', accessLevel: 'READ'}}
  },

  {path: 'trialBalance', component: TrailBalanceComponent, data: {hasPermission: {id: 'accounting_ledgers', accessLevel: 'READ'}}},
  {
    path: 'incomeStatement',
    component: IncomeStatementComponent,
    data: {hasPermission: {id: 'accounting_income_statement', accessLevel: 'READ'}}
  },
  {
    path: 'financialCondition',
    component: FinancialConditionComponent,
    data: {hasPermission: {id: 'accounting_fin_condition', accessLevel: 'READ'}}
  },
  {
    path: 'transactiontypes',
    component: TransactionTypeListComponent,
    data: {hasPermission: {id: 'accounting_tx_types', accessLevel: 'READ'}}
  },
  {
    path: 'transactiontypes/create',
    component: CreateTransactionTypeFormComponent,
    data: {hasPermission: {id: 'accounting_tx_types', accessLevel: 'CHANGE'}}
  },
  {
    path: 'transactiontypes/edit/:code',
    component: EditTransactionTypeFormComponent,
    canActivate: [TransactionTypeExistsGuard],
    data: {hasPermission: {id: 'accounting_tx_types', accessLevel: 'CHANGE'}}
  },
  {path: 'chartOfAccounts', component: ChartOfAccountComponent, data: {hasPermission: {id: 'accounting_ledgers', accessLevel: 'READ'}}},
  {path: 'journalEntries', component: JournalEntryListComponent, data: {hasPermission: {id: 'accounting_journals', accessLevel: 'READ'}}},
  {
    path: 'journalEntries/create',
    component: CreateJournalEntryFormComponent,
    data: {hasPermission: {id: 'accounting_journals', accessLevel: 'CHANGE'}}
  },
  {path: 'cheques', component: ChequesListComponent, data: {hasPermission: {id: 'cheque_management', accessLevel: 'READ'}}},
  {path: 'payrolls', component: PayrollListComponent, data: {hasPermission: {id: 'payroll_distribution', accessLevel: 'READ'}}},
  {
    path: 'payrolls/create',
    component: CreatePayrollFormComponent,
    data: {hasPermission: {id: 'payroll_distribution', accessLevel: 'CHANGE'}}
  },
  {
    path: 'payrolls/payments/:id',
    component: PaymentsListComponent,
    data: {hasPermission: {id: 'payroll_distribution', accessLevel: 'READ'}}
  }
];
