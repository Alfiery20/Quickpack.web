import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LayoutComponent } from "./pages/layout/layout.component";
import { RolComponent } from "./pages/rol/rol.component";


const routes: Routes = [
    {
        path: "",
        component: LayoutComponent,
        children: [
            {
                path: "rol",
                component: RolComponent,
                children: [
                ]
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PrivateRoutingModule { }