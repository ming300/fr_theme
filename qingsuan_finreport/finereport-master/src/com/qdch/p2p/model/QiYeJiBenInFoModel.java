package com.qdch.p2p.model;

import java.util.List;

import org.apache.commons.lang.StringUtils;

import com.jfinal.plugin.activerecord.Model;

public class QiYeJiBenInFoModel extends Model<QiYeJiBenInFoModel>{
	private static final long serialVersionUID = 1L;
	public static final QiYeJiBenInFoModel dao=new QiYeJiBenInFoModel();
	/**
	 * 获取企业基本信息
	 * @author 高照
	 * @date 2018年4月11日
	 * @TODO
	 */
	public QiYeJiBenInFoModel getCompybasicinfo(String bigjys,String pyType,String hasInfo){
		String sql="select * from insight_pp_corp_info where 1=1 ";
		if(StringUtils.isNotBlank(bigjys)){
			sql+=" and jysc in "+bigjys;
		} 
		
		if(StringUtils.isNotBlank(pyType)){
			sql+=" and jysc = '"+pyType+"' ";
		} 
		if(StringUtils.isNotBlank(hasInfo)){
			sql+="  ";
		} 
		//日期
		sql+=" order by vday desc  ";
		return dao.findFirst(sql);
	}
}