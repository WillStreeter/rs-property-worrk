import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/mergeMap';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store, Action } from '@ngrx/store';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import * as errorActions from '../actions/error.actions';
import * as propertyActions from '../actions/properties.actions';
import { PropertiesService } from '../../api-services/properties.service';
import * as fromRoot from '../reducers/index';
import { PropertyModel} from '../../../business-layer/models';



@Injectable()
export class PropertiesEffects {

    @Effect() fetchPropertiesCollection: Observable<Action>  = this.actions$
        .ofType(propertyActions.PropertiesTypes.FETCH_PROPERTIES_COLLECTION_ATTEMPT)
        .switchMap(() => {
                return this.propertiesService.getProperties(
                errorActions.ErrorTypes.REPORT_ERROR,
                propertyActions.PropertiesTypes.FETCH_PROPERTIES_COLLECTION_FAILURE,
                propertyActions.PropertiesTypes.FETCH_PROPERTIES_COLLECTION_SUCCESS );
        });


    @Effect() updatePropertyInCollectionAttempt = this.actions$
        .ofType(propertyActions.PropertiesTypes.UPDATE_PROPERTY_IN_COLLECTION_ATTEMPT)
        .map((action: propertyActions.UpdatePropertyAttempt) => action.payload)
        .switchMap( (payload: any ) => {
            return this.propertiesService.updateProperty( payload,
                errorActions.ErrorTypes.REPORT_ERROR,
                propertyActions.PropertiesTypes.UPDATE_PROPERTY_IN_COLLECTION_FAILURE,
                propertyActions.PropertiesTypes.UPDATE_PROPERTY_IN_COLLECTION_SUCCESS);
          } );





 constructor( private store: Store<fromRoot.State>,
              private propertiesService: PropertiesService,
              private actions$: Actions
             ) {  }
}
