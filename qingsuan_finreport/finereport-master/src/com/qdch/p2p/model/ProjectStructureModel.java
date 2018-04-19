package com.qdch.p2p.model;

import java.util.List;

import org.apache.commons.lang.StringUtils;

import com.jfinal.plugin.activerecord.Model;
/**
 * 获取字典平台信息
* @author doushuihai  
* @date 2018年4月10日上午10:21:25  
* @TODO
 */
public class ProjectStructureModel extends Model<ProjectStructureModel> {

	/** 
	* @Fields serialVersionUID : TODO 
	*/  
	private static final long serialVersionUID = 1L;
	public static final ProjectStructureModel dao=new ProjectStructureModel();
	public List<ProjectStructureModel> getProjectStructure(String dataSql,String jys){	
		String sql="select jyscmc,jysc,iterm_type,sum(iterm_value) as value "
				+ "from insight_pp_iterm_count where 1=1  ";

		
		if(StringUtils.isNotBlank(dataSql)){
			sql+=" and jysc in"+ dataSql+"";
		}
		if(StringUtils.isNotBlank(jys)){
			sql+="and jysc='"+ jys+"'  ";
			
		}
		sql+="group by iterm_type,jyscmc,jysc";
		return dao.find(sql);
	}
	public List<ProjectStructureModel> getProjectIterm(String dataSql,String jys){	
		String sql="select jyscmc,jysc,iterm_term,sum(iterm_value) as value "
				+ "from insight_pp_iterm_count where 1=1  ";

		
		if(StringUtils.isNotBlank(dataSql)){
			sql+=" and jysc in"+ dataSql+"";
		}
		if(StringUtils.isNotBlank(jys)){
			sql+="and jysc='"+ jys+"'  ";
			
		}
		sql+="group by iterm_term,jyscmc,jysc";
		return dao.find(sql);
	}

	

}
