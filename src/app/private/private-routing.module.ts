import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LayoutComponent } from "./pages/layout/layout.component";
import { RolComponent } from "./pages/rol/rol.component";
import { authorizeGuard } from "../core/guards/authorize.guard";
import { PersonalComponent } from "./pages/personal/personal.component";
import { TipoProductoComponent } from "./pages/tipo-producto/tipo-producto.component";


const routes: Routes = [
    {
        path: "",
        component: LayoutComponent,
        canActivateChild: [authorizeGuard],
        children: [
            {
                path: "rol",
                component: RolComponent,
                children: [
                ]
            },
            {
                path: "personal",
                component: PersonalComponent,
                children: [
                ]
            }
            ,
            {
                path: "tipoproducto",
                component: TipoProductoComponent,
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