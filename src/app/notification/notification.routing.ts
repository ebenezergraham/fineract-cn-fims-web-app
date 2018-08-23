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
import {NotificationComponent} from './notification.component';
import {CreateCustomerFormComponent} from './form/create/create.form.component';
import {CustomerDetailComponent} from './detail/customer.detail.component';
import {EditCustomerFormComponent} from './form/edit/edit.form.component';
import {CustomerActivityComponent} from './detail/activity/activity.component';
import {CustomerStatusComponent} from './detail/status/status.component';
import {CustomerIndexComponent} from './detail/customer.index.component';
import {NotificationExistsGuard} from './notification-exists.guard';
import {CustomerPortraitComponent} from './detail/portrait/portrait.component';
export const CustomerRoutes: Routes = [
  {
    path: '',
    component: NotificationComponent,
    data: {title: 'Manage Customers', hasPermission: {id: 'customer_customers', accessLevel: 'READ'}},
    canActivate: [ CatalogExistsGuard ]
  },
  {
    path: 'create',
    component: CreateCustomerFormComponent,
    data: {title: 'Create Customer', hasPermission: { id: 'customer_customers', accessLevel: 'CHANGE' }}
  },
  {
    path: 'detail/:id/edit',
    component: EditCustomerFormComponent,
    data: {title: 'Edit Customer', hasPermission: { id: 'customer_customers', accessLevel: 'CHANGE' }},
    canActivate: [ NotificationExistsGuard ]
  },
  {
    path: 'detail/:id',
    component: CustomerIndexComponent,
    data: {
      hasPermission: { id: 'customer_customers', accessLevel: 'READ' }
    },
    canActivate: [ NotificationExistsGuard ],
    children: [
      {
        path: '',
        component: CustomerDetailComponent,
        data: {title: 'View Customer'}
      },
      {
        path: 'tasks',
        component: CustomerStatusComponent,
        data: {title: 'Manage Customer Tasks'},
      },
      {
        path: 'activities',
        component: CustomerActivityComponent,
        data: {title: 'Manage Customer Tasks'}
      },
      {
        path: 'portrait',
        component: CustomerPortraitComponent,
        data: {
          title: 'Upload portrait',
          hasPermission: { id: 'customer_portrait', accessLevel: 'READ' }
        }
      },
      {path: 'identifications', loadChildren: './detail/identityCard/identity-card.module#IdentityCardModule'},
      {path: 'loans', loadChildren: './cases/case.module#CaseModule'},
      {path: 'deposits', loadChildren: './deposits/deposits.module#DepositsModule'},
      {
        path: 'payroll',
        canActivate: [ PayrollExistsGuard ],
        data: {
          hasPermission: { id: 'payroll_configuration', accessLevel: 'READ' }
        },
        children: [
          {
            path: '',
            component: CustomerPayrollDetailComponent
          },
          {
            path: 'edit',
            component: CreateCustomerPayrollFormComponent,
            data: {
              hasPermission: { id: 'payroll_configuration', accessLevel: 'CHANGE' }
            }
          }
        ]
      }
    ]
  },
  {
    path: 'tasks',
    component: TaskListComponent,
    data: {
      hasPermission: { id: 'customer_tasks', accessLevel: 'READ' }
    }
  },
  {
    path: 'tasks/detail/:id',
    canActivate: [ TaskExistsGuard ],
    component: TaskIndexComponent,
    data: {
      hasPermission: { id: 'customer_tasks', accessLevel: 'READ' }
    },
    children: [
      {
        path: '',
        component: TaskDetailComponent
      },
      {
        path: 'edit',
        component: TaskEditFormComponent,
        data: {
          hasPermission: { id: 'customer_tasks', accessLevel: 'CHANGE' }
        }
      }
    ]
  },
  {
    path: 'tasks/create',
    component: TaskCreateFormComponent,
    data: {
      hasPermission: { id: 'customer_tasks', accessLevel: 'CHANGE' }
    }
  },
  {
    path: 'catalog/detail',
    data: {
      hasPermission: { id: 'catalog_catalogs', accessLevel: 'READ' }
    },
    children: [
      {
        path: '',
        component: CatalogDetailComponent
      },
      {
        path: 'edit',
        component: CreateCustomerCatalogFormComponent,
        data: {
          hasPermission: { id: 'catalog_catalogs', accessLevel: 'CHANGE' }
        }
      },
      {
        path: 'field/detail/:fieldId',
        component: FieldIndexComponent,
        canActivate: [ FieldExistsGuard ],
        children: [
          {
            path: '',
            component: FieldDetailComponent
          },
          {
            path: 'edit',
            component: EditCatalogFieldFormComponent,
            data: {
              hasPermission: { id: 'catalog_catalogs', accessLevel: 'CHANGE' }
            }
          }
        ]
      }
    ]
  }
];
