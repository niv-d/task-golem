<app-grid>
  <toolbar />
  <columns />
</app-grid>

<style>
  app-grid {
    display: grid;
    grid-template-rows: 50px 1fr;
    grid-template-columns: 1fr;
    grid-template-areas:
      'toolbar'
      'columns';
  }
  toolbar {
    align-items: end;
    justify-content: center;
    grid-area: toolbar;
  }
  columns {
    grid-area: columns;
  }
</style>
