/**
  * article controller
*/
import { factories } from '@strapi/strapi';
import schemas from '../../../../schemas';
import content_schemas from '../../../../general-schemas';
    
export default factories.createCoreController('api::article.article', ({ strapi }): {} => ({
    
    async find(ctx: any): Promise<content_schemas.ResponseCollection<'api::article.article'>> {
      return await super.find(ctx)
    }
}));