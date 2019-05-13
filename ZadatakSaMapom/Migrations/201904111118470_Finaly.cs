namespace ZadatakSaMapom.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Finaly : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Motorcycles", "X", c => c.Double(nullable: false));
            AddColumn("dbo.Motorcycles", "Y", c => c.Double(nullable: false));
            AddColumn("dbo.Motorcycles", "Coment", c => c.String());
            AddColumn("dbo.Trucks", "X", c => c.Double(nullable: false));
            AddColumn("dbo.Trucks", "Y", c => c.Double(nullable: false));
            AddColumn("dbo.Trucks", "Coment", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Trucks", "Coment");
            DropColumn("dbo.Trucks", "Y");
            DropColumn("dbo.Trucks", "X");
            DropColumn("dbo.Motorcycles", "Coment");
            DropColumn("dbo.Motorcycles", "Y");
            DropColumn("dbo.Motorcycles", "X");
        }
    }
}
