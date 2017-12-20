import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FileListComponent } from './file-list/file-list.component';
import { FileViewComponent } from './file-view/file-view.component';

const routes: Routes = [
    { path: '', redirectTo: '/files', pathMatch: 'full' },
    { path: 'files', component: FileListComponent },
    { path: 'file/:fileName', component: FileViewComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
