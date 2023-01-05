import { factories } from '@strapi/strapi';
import slugify from 'slugify';
import schemas from '../../../../schemas';
import content_schemas from '../../../../general-schemas';
import randomstring from 'randomstring';
    
export default factories.createCoreService('api::article.article', ({ strapi }): {} => ({
    
    async create(params: { data: content_schemas.GetAttributesValues<'api::article.article'>, files: content_schemas.GetAttributesValues<'plugin::upload.file'> }): Promise<schemas.ApiArticleArticle> {
        params.data.publishedAt = Date.now().toString()
        params.data.slug = await this.slug(params.data.title)
        const results = await strapi.entityService.create('api::article.article', {
            data: params.data,
        })
        return results
    },
    
    async slug(title: string): Promise<string> {
        const entry: Promise<schemas.ApiArticleArticle> = await strapi.db.query('api::article.article').findOne({
            select: ['title'],
            where: { title },
        });        
        let random = entry == null ? '' : randomstring.generate({
            length: 6,
            charset: 'alphanumeric'
        })
        return slugify(`${title} ${random}`, {
            lower: true,
        })
    }
}));