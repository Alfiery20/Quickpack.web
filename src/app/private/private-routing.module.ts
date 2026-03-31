import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LayoutComponent } from "./pages/layout/layout.component";
import { RolComponent } from "./pages/rol/rol.component";
import { authorizeGuard } from "../core/guards/authorize.guard";
import { PersonalComponent } from "./pages/personal/personal.component";
import { TipoProductoComponent } from "./pages/tipo-producto/tipo-producto.component";
import { CategoriaComponent } from "./pages/categoria/categoria.component";
import { ProductoComponent } from "./pages/producto/producto.component";


const routes: Routes = [
    {
        path: "",
        component: LayoutComponent,
        canActivateChild: [authorizeGuard],
        children: [
            {
                path: "rol",
                component: RolComponent,
                canActivateChild: [authorizeGuard],
                children: [
                ]
            },
            {
                path: "personal",
                component: PersonalComponent,
                canActivateChild: [authorizeGuard],
                children: [
                ]
            },
            {
                path: "tipoproducto",
                component: TipoProductoComponent,
                canActivateChild: [authorizeGuard],
                children: [
                ]
            },
            {
                path: "categoria",
                component: CategoriaComponent,
                canActivateChild: [authorizeGuard],
                children: [
                ]
            },
            {
                path: "producto",
                component: ProductoComponent,
                canActivateChild: [authorizeGuard],
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