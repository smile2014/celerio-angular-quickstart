//
// Source code generated by Celerio, a Jaxio product.
// Documentation: http://www.jaxio.com/documentation/celerio/
// Follow us on twitter: @jaxiosoft
// Need commercial support ? Contact us: info@jaxio.com
// Template pack-angular:web/src/app/entities/entity-list.component.ts.e.vm
//
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { DataTable, LazyLoadEvent, ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
import { PageResponse } from "../../support/paging";
import { MessageService } from '../../service/message.service';
import { Project } from './project';
import { ProjectDetailComponent } from './project-detail.component';
import { ProjectService } from './project.service';
import { Author } from '../author/author';
import { AuthorLineComponent } from '../author/author-line.component';

@Component({
    moduleId: module.id,
	templateUrl: 'project-list.component.html',
	selector: 'project-list'
})
export class ProjectListComponent {

    @Input() header = "Projects...";

    // When 'sub' is true, it means this list is used as a one-to-many list.
    // It belongs to a parent entity, as a result the addNew operation
    // must prefill the parent entity. The prefill is not done here, instead we
    // emit an event.
    // When 'sub' is false, we display basic search criterias
    @Input() sub : boolean;
    @Output() onAddNewClicked = new EventEmitter();

    projectToDelete : Project;

    // basic search criterias (visible if not in 'sub' mode)
    example : Project = new Project();

    // list is paginated
    currentPage : PageResponse<Project> = new PageResponse<Project>(0,0,[]);

    // X to one: input param is used to filter the list when displayed
    // as a one-to-many list by the other side.
    private _author : Author;

    constructor(private router : Router,
        private projectService : ProjectService,
        private messageService : MessageService,
        private confirmationService: ConfirmationService) {
    }

    /**
     * Invoked when user presses the search button.
     */
    search(dt : DataTable) {
        if (!this.sub) {
            dt.reset();
            this.loadPage({ first: 0, rows: dt.rows, sortField: dt.sortField, sortOrder: dt.sortOrder, filters: null, multiSortMeta: dt.multiSortMeta });
        }
    }

    /**
     * Invoked automatically by primeng datatable.
     */
    loadPage(event : LazyLoadEvent) {
        this.projectService.getPage(this.example, event).
            subscribe(
                pageResponse => this.currentPage = pageResponse,
                error => this.messageService.error('Could not get the results', error)
            );
    }

    // X to one: input param is used to filter the list when displayed
    // as a one-to-many list by the other side.
    @Input()
    set author(author : Author) {
        if (author == null) {
            return;
        }
        this._author = author;

        this.example = new Project();
        this.example.author = new Author();
        this.example.author.id = this._author.id;
    }


    onRowSelect(event : any) {
        let id =  event.data.id;
        this.router.navigate(['/project', id]);
    }

    addNew() {
        if (this.sub) {
            this.onAddNewClicked.emit("addNew");
        } else {
            this.router.navigate(['/project', 'new']);
        }
    }

    showDeleteDialog(rowData : any) {
        let projectToDelete : Project = <Project> rowData;

        this.confirmationService.confirm({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'fa fa-trash',
            accept: () => {
                this.delete(projectToDelete);
            }
        });
    }

    private delete(projectToDelete : Project) {
        let id =  projectToDelete.id;

        this.projectService.delete(id).
            subscribe(
                response => {
                    this.currentPage.remove(projectToDelete);
                    this.messageService.info('Deleted OK', 'Angular Rocks!');
                },
                error => this.messageService.error('Could not delete!', error)
            );
    }
}