import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./pages/login/login.component";
import { HomeComponent } from "./pages/home/home.component";
import { InicioComponent } from "./pages/inicio/inicio.component";
import { InnovacionComponent } from "./pages/innovacion/innovacion.component";
import { InformacionEmpresaComponent } from "./pages/informacion-empresa/informacion-empresa.component";
import { VideosEmpresaComponent } from "./pages/videos-empresa/videos-empresa.component";
import { ContactanosComponent } from "./pages/contactanos/contactanos.component";

const routes: Routes = [
    {
        path: "",
        component: HomeComponent,
        children: [
            {
                path: "",
                component: InicioComponent,
                children: [
                ]
            },
            {
                path: "innovacion",
                component: InnovacionComponent,
                children: [
                ]
            },
            {
                path: "informacion",
                component: InformacionEmpresaComponent,
                children: [
                ]
            },
            {
                path: "videos",
                component: VideosEmpresaComponent,
                children: [
                ]
            },
            {
                path: "contacto",
                component: ContactanosComponent,
                children: [
                ]
            }
        ]
    },
    {
        path: "login",
        component: LoginComponent,
        children: [
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PublicRoutingModule { }